### API 规格（MVP 草案）
Base URL: /api

#### Auth
- POST /auth/phone/start  启动短信验证码（腾讯云 SMS）
- POST /auth/phone/verify  验证并登录（支持 +44/+86）
- POST /auth/email/bind  绑定邮箱
- GET  /auth/me  当前用户

#### Schools & Categories
- GET /schools  列出学校（默认优先曼城三校）
- GET /categories  列出类目

#### Listings
- POST /listings  新建（标题/描述/价格/类目/成色/位置/图片）
- GET  /listings  列表（分页，筛选：schoolId/categoryId/price/condition/sort）
- GET  /listings/{id}  详情
- PATCH /listings/{id}  编辑
- POST /listings/{id}/hide  下架/隐藏
- POST /listings/{id}/sold  标记售出

#### Search
- GET /search?q=&schoolId=&categoryId=&minPrice=&maxPrice=&condition=&sort=

#### Favourites
- POST /favourites/{listingId}
- DELETE /favourites/{listingId}
- GET /me/favourites

#### Conversations & Messages
- POST /conversations  (listingId, toUserId?) 建立会话
- GET  /conversations  我的会话（按 lastMessageAt desc）
- GET  /conversations/{id}
- POST /conversations/{id}/messages  发送文本/图片
- GET  /conversations/{id}/messages  拉取历史

#### Reviews
- POST /reviews  (toUserId, listingId?, rating, comment)
- GET  /users/{id}/reviews

#### Reports
- POST /reports  (targetType, targetId, reasonCode, detail)
- GET  /reports (admin)
- POST /moderation/actions  (admin，处理：下架/警告/封禁)

#### Notifications
- GET /notifications  我的通知
- POST /notifications/{id}/read

#### 上传
- POST /uploads/presign  获取图片直传签名（R2/S3 兼容）

#### 说明
- 认证：Bearer Token；
- 语言：仅中文；
- 速率限制：登录/验证码/发消息等关键接口限流；
- 审核：上架与消息图片经过本地轻量审核；
- 日志/追踪：请求ID、审计日志（敏感操作）。