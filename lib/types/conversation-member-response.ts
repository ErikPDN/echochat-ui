export enum MemberRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export interface ConversationMemberResponse {
  userId: string;
  username: string;
  name: string;
  role: MemberRole;
  joinedAt: Date;
  leftAt?: Date;
}
