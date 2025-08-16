### 数据模型（MVP）

#### 核心实体
- User（用户）
  - id, createdAt, updatedAt
  - phoneE164, phoneCountry (CN/UK), phoneVerified
  - email, emailVerified
  - nickname, avatarUrl
  - schoolId?, status (active/suspended)
  - ratingAverage, ratingCount

- School（学校）
  - id, name, shortName, city, campuses?, isActive

- Category（类目）
  - id, name, parentId?, isActive, sortOrder

- Listing（上架商品）
  - id, sellerId (User), schoolId, categoryId
  - title, description
  - priceGBP (int in pence)
  - condition (enum: new/like_new/good/used)
  - locationNote (e.g. 某校区/地铁站)
  - images: [imageUrl]
  - status (active/hidden/sold/removed)
  - views, favouritesCount

- Favourite（收藏）
  - id, userId, listingId, createdAt

- Conversation（会话）
  - id, listingId, buyerId, sellerId, lastMessageAt

- Message（消息）
  - id, conversationId, senderId, type(text/image), content/url, createdAt

- Review（评价）
  - id, fromUserId, toUserId, listingId?, rating (1-5), comment, createdAt

- Report（举报）
  - id, reporterId, targetType(user/listing/message), targetId, reasonCode, detail, status(open/reviewed/actioned), createdAt

- Notification（通知）
  - id, userId, type, payload(json), readAt?

- ModerationLog（审核记录）
  - id, targetType, targetId, ruleHit, action(take_down/warn/ban), reviewerId?, createdAt

#### 关系与约束
- User 1—N Listing；User 1—N Review（from/to）；
- Listing 1—N Conversation；Conversation 1—N Message；
- School 1—N User/Listing；Category 树形结构（最多两层）。

#### 索引建议
- Listing: (schoolId, status, createdAt desc)、(categoryId, status)、全文检索(title, description)；
- Conversation: (buyerId, lastMessageAt desc)、(sellerId, lastMessageAt desc)；
- Message: (conversationId, createdAt asc)。

#### 审核与风控字段（建议）
- Listing: riskScore, autoModeration(status, reasons[]), manualReview(status, reviewerId)；
- User: strikeCount, lastWarningAt。