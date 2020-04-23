import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>) {}

  async create() {
    const conversation = new Conversation();
    conversation.stage = "setup";

    await this.conversationRepository.save(conversation).then(conversation => {
                console.log("Conversation has been saved. Conversation id is", conversation.id);
            });;
  }

}
