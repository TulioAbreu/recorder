package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
	"sync"
)

type Server struct {
	port      string
	command   string
	isRunning bool
	mux       sync.Mutex
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
	ln, _ := net.Listen("tcp", ":"+serv.port)

	conn, _ := ln.Accept()
	defer conn.Close()

	fmt.Println("[INFO] Conexão iniciada.")

	for {
		message, _ := bufio.NewReader(conn).ReadString('\n')
		serv.SetCommand(message)

		fmt.Println("[DEBUG] Mensagem recebida:", message)

		if strings.HasPrefix(message, "!finish") {
			serv.isRunning = false
			break
		}
	}

	wg.Done()
}