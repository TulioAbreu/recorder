package main

import (
	"fmt"
	"strings"
	"sync"
)

func main() {
	var wg sync.WaitGroup

	fmt.Println("[INFO] Reading config file...")
	config, err := readConfig()
	if err != nil {
		fmt.Println("[ERROR] Não foi possível abrir o arquivo './config.json'")
		return
	}

	fmt.Println("[INFO] Starting recorder structure...")
	var recorder Recorder = CreateRecorder(config.Baud, config.ArduinoPath)

	fmt.Println("[INFO] Starting server structure...")
	var server Server = CreateServer(config.ServerPort)

	fmt.Println("[INFO] Running server...")
	wg.Add(1)
	go server.Run(&wg)
	go RunCommands(&recorder, &server)
	wg.Wait()
}

func RunCommands(rec *Recorder, serv *Server) {
	for {
		cmd := serv.Command()

		if cmd == "" {
			continue
		}

		if strings.HasPrefix(cmd, "start") {
			fmt.Println("[INFO] Started recording.")
			rec.SetIsRecording(true)
			// go recordSample()
		} else if strings.HasPrefix(cmd, "finish") {
			fmt.Println("[INFO] Finished recording.")
			rec.SetIsRecording(false)
		}

		serv.ClearCommand()
	}
}
