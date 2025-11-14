import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppComponent {
  title = 'AI Chat Demo';
  messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ sender: 'user', text: input });
    this.userInput = '';
    this.isLoading = true;

    this.chatService.sendMessage(input).subscribe({
      next: (response) => {
        this.messages.push({ sender: 'bot', text: response.response });
      },
      error: (err) => {
        this.messages.push({ sender: 'bot', text: '⚠️ Error calling the API.' });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
