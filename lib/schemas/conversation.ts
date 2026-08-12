import z from "zod";

export const conversationPrivateSchema = z.object({
  userId: z.uuidv4("Member ID must be a valid UUID"),
});

export type ConversationPrivateSchema = z.infer<
  typeof conversationPrivateSchema
>;

export const conversationGroupSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  members: z
    .array(z.uuidv4("Member ID must be a valid UUID"))
    .min(1, "Select at least one member to start a group conversation with"),
});

export type ConversationGroupSchema = z.infer<typeof conversationGroupSchema>;
