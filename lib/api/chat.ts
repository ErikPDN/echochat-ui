import {
  ConversationGroupSchema,
  ConversationPrivateSchema,
} from "../schemas/conversation";
import { AddMemberToConversationRequest } from "../types/add-member-to-conversation";
import { ConversationResponse } from "../types/conversation.response";
import { httpClient } from "./http-client";

export const getConversations = async () => {
  const response =
    await httpClient.get<ConversationResponse[]>("/conversations");

  return response.data;
};

export const createGroupConversation = async (
  data: ConversationGroupSchema,
) => {
  const response = await httpClient.post<ConversationResponse>(
    "/conversations/group",
    data,
  );

  return response.data;
};

export const createPrivateConversation = async (
  data: ConversationPrivateSchema,
) => {
  const { memberId } = data;
  const response = await httpClient.post<ConversationResponse>(
    "/conversations/private",
    { memberId },
  );

  return response.data;
};

export const addMemberToConversation = async (
  data: AddMemberToConversationRequest,
) => {
  const { conversationId, memberId } = data;
  const response = await httpClient.post<ConversationResponse>(
    `/conversations/${conversationId}/members`,
    { memberId },
  );
  return response.data;
};
