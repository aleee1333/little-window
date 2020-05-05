import { Injectable } from '@nestjs/common';
import { StoryblokService } from '../botMessage/storyblok.service';
import { ConversationService } from '../conversation/conversation.service';

@Injectable()
export class UserMessageService {
  constructor(
    private conversationService: ConversationService,
    private storyblokService: StoryblokService,
  ) {}

  setupConversation = async (
    userResponse,
    conversationId,
    previousMessageStoryblokId,
  ): Promise<void> => {
    // TODO: Can we do something nice with the getBotResponsesBySlug
    // so we don't have to filter afterwards.
    const splitUserResponse = userResponse.split('-');
    const botResponses = await this.storyblokService.getBotResponsesBySlug(
      'setup',
    );

    const previousMessageWasSetupMessage =
      botResponses.filter(
        response => response['uuid'] === previousMessageStoryblokId,
      ).length > 0;

    if (previousMessageWasSetupMessage) {
      const isFormattedLikeSetupAnswer =
        splitUserResponse.length === 3 && splitUserResponse[0] === 'SETUP';

      const column = splitUserResponse[1];
      let value = splitUserResponse[2];

      if (column === 'gdpr') {
        try {
          value = JSON.parse(splitUserResponse[2]);
        } catch (e) {
          return;
        }
      }

      if (isFormattedLikeSetupAnswer) {
        try {
          await this.conversationService.update(column, value, conversationId);
        } catch (error) {
          throw error;
        }
      } else if (
        botResponses.filter(response => response['name'] === 'new-language')[0][
          'uuid'
        ] === previousMessageStoryblokId
      ) {
        await this.conversationService.update('language', 'en', conversationId);
      }
    }
  };
}
