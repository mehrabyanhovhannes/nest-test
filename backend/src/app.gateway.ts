import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class AppGateway {
	@WebSocketServer()
	server;

	@SubscribeMessage('callHelp')
	handleRequest(client, data): void {
		this.server.emit('sendCallMessage', data)
	}

	@SubscribeMessage('acceptCall')
	acceptCall(client, data): void {
		this.server.emit('sendAcceptMessage', data)
	}
}