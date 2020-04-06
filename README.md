# Go-Recorder

This project is an entire platform for recording accelerometer data using arduino, raspberry pi and your smartphone.

The main idea here is to use smartphone as an interface for start/finish recording accelerometer samples and stay free (without wires) while recording.

Since we're using TCP protocol for the communication between raspberry and smartphone, your raspberry must be connected to the same network as your smartphone.

# Dependencies

- [GoLang](https://golang.org/)
- [Expo](https://expo.io/)
- [NodeJs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

# Quick Start

You can easily upload the "main.ino" file to your board, using [Arduino IDE](https://www.arduino.cc/en/main/software).

Building/running server:
```console
$ go build ./server/src
$ ./src
```

Building mobile:
```console
$ cd mobile
$ expo install
$ expo init
```
