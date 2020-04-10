package main

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type Server struct {
	port      string
	command   string
	isRunning bool
	mux       sync.Mutex
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func CreateServer(port string) Server {
	return Server{port: port, command: "", isRunning: false}
}

func (serv *Server) Command() string {
	serv.mux.Lock()
	defer serv.mux.Unlock()
	return serv.command
}

func (serv *Server) SetCommand(value string) {
	serv.mux.Lock()
	defer serv.mux.Unlock()
	serv.command = value
}

func (serv *Server) Run(wg *sync.WaitGroup) {
	serv.isRunning = true

	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		socket, err := upgrader.Upgrade(writer, request, nil)

		if err != nil {
			fmt.Println(err)
		}

		fmt.Println("[INFO] Conexão estabelecida!")

		for {
			_, msg, err := socket.ReadMessage()

			if err != nil {
				fmt.Println("[DEBUG] Conexão perdida!")
				wg.Done()
				return
			}

			serv.SetCommand(string(msg))
			fmt.Println("[LOG] Recebida a mensagem:", string(msg))
		}
	})
	http.ListenAndServe(":"+serv.port, nil)
}
