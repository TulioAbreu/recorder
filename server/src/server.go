package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

type Server struct {
	port         string
	command      string
	commandParam string
	isRunning    bool
	mux          sync.Mutex
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

func (serv *Server) ClearCommand() {
	serv.mux.Lock()
	defer serv.mux.Unlock()
	serv.command = ""
	serv.commandParam = ""
}

func (serv *Server) SetCommand(value JsonMessage) {
	serv.mux.Lock()
	defer serv.mux.Unlock()
	serv.command = value.Opcode
	serv.commandParam = value.Activity
}

type JsonMessage struct {
	Opcode   string `json:"opcode"`
	Activity string `json:"activity"`
}

func StrToJsonMessage(str string) JsonMessage {
	var msg JsonMessage
	err := json.Unmarshal([]byte(str), &msg)

	if err != nil {
		return JsonMessage{}
	}

	return msg
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

			var jsonMsg JsonMessage = StrToJsonMessage(string(msg))
			serv.SetCommand(jsonMsg)
			fmt.Println("[LOG] Recebida a mensagem:", string(msg))
		}
	})
	http.ListenAndServe(":"+serv.port, nil)
}
