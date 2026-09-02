import {
  ConversationGroupSchema,
  ConversationPrivateSchema,
} from "../schemas/conversation";
import { AddMemberToConversationRequest } from "../types/add-member-to-conversation";
import { ConversationSummaryResponse } from "../types/conversation-summary.response";
import { ConversationResponse } from "../types/conversation.response";
import { SendMessageRequest } from "../types/send-message";
import { httpClient } from "./http-client";

export const getConversations = async () => {
  const response =
    await httpClient.get<ConversationResponse[]>("/conversations");

  return response.data;
};

export const getMessages = async (conversationId: string) => {
  const response = await httpClient.get(
    `conversations/${conversationId}/messages`,
  );
  return response.data;
};

export const createGroupConversation = async (
  data: ConversationGroupSchema,
) => {
  const formData = new FormData();
  formData.append("groupName", data.groupName);
  data.memberIds.forEach((memberId) => {
    formData.append("memberIds", memberId);
  });
  if (data.file) formData.append("file", data.file);

  const response = await httpClient.post<ConversationResponse>(
    "/conversations/group",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
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

export const sendMessage = async (data: SendMessageRequest) => {
  const { conversationId, content, contentType, fileIds } = data;
  const response = await httpClient.post(
    `/conversations/${conversationId}/messages`,
    { content, contentType, fileIds },
  );
  return response.data;
};

export const getMessagesSummary = async (conversationIds: string[]) => {
  const response = await httpClient.get<ConversationSummaryResponse[]>(
    "conversations/messages/summary",
    {
      params: { conversationIds: conversationIds.join(",") },
    },
  );
  return response.data;
};
