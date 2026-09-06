export interface SendMessageRequest {
  conversationId: string;
  content?: string;
  contentType: string;
  fileIds?: string[];
}
