package main

import (
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
