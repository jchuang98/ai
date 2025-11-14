/* import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
  async sendMessage(message: string): Promise<string> {
    // TODO: Replace this with your backend API call (FastAPI / Lambda / LangGraph)
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(`Echo from AI: "${message}"`);
      }, 800)
    );
  }
} */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  sendMessage(userInput: string) {
    return this.http.post<{response: string}>('http://localhost:8001/api/chat', {
      input: userInput
    });
  }
}
