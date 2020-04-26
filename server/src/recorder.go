package main

import (
	"fmt"
	"os"
	"sync"
)

type Sample struct {
	x float32
	y float32
	z float32
}

type Recorder struct {
	samples     []Sample
	isRunning   bool
	arduinoPath string
	baud        int
	mux         sync.Mutex
}

func CreateRecorder(baud int, arduinoPath string) Recorder {
	return Recorder{isRunning: false, arduinoPath: arduinoPath, baud: baud}
}

func (rec *Recorder) IsRecording() bool {
	rec.mux.Lock()
	defer rec.mux.Unlock()
	return rec.isRunning
}

func (rec *Recorder) SetIsRecording(value bool) {
	rec.mux.Lock()
	defer rec.mux.Unlock()
	rec.isRunning = value
}

func (rec *Recorder) RecordValues() {
	// TODO: #1 Implement accelerometer values recording
}

func WriteFile(filePath string, strData string) bool {
	file, err := os.Create(filePath)
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer file.Close()

	_, err = file.WriteString(strData)
	if err != nil {
		fmt.Println(err)
		return false
	}

	return true
}

func (rec *Recorder) Save(filepath string) {
	var csvStr = "x,y,z\n" // CSV Header
	for i := 0; i < len(rec.samples); i++ {
		csvStr += fmt.Sprintf("%f,%f,%f\n", rec.samples[i].x, rec.samples[i].y, rec.samples[i].z)
	}
	WriteFile(filepath, csvStr)
}
