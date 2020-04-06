package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"
)

type Config struct {
	ServerPort  string `json:"serverPort"`
	ArduinoPath string `json:"arduinoPath"`
	Baud        int    `json:"baud"`
}

func readConfig() (Config, error) {
	var config Config
	jsonFile, err := os.Open("./config.json")

	if err != nil {
		return Config{}, errors.New("Could not open 'config.json' file.")
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &config)

	return config, nil
}
