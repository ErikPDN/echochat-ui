import z from "zod";

const MAXC_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

export const conversationPrivateSchema = z.object({
  memberId: z.uuidv4("Member ID must be a valid UUID"),
});

export type ConversationPrivateSchema = z.infer<
  typeof conversationPrivateSchema
>;

export const conversationGroupSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  memberIds: z
    .array(z.uuidv4("Member ID must be a valid UUID"))
    .min(1, "Select at least one member to start a group conversation with"),
  file: z
    .file()
    .max(MAXC_FILE_SIZE, "File size must be less than 5MB")
    .mime(ACCEPTED_FILE_TYPES, "File must be an image (jpeg, png, jpg, webp)")
    .optional(),
});

export type ConversationGroupSchema = z.infer<typeof conversationGroupSchema>;

export const conversationGroupFormSchema = conversationGroupSchema.omit({
  memberIds: true,
});

export type ConversationGroupFormSchema = z.infer<
  typeof conversationGroupFormSchema
>;
