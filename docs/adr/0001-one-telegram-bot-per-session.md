# One Telegram bot identity per Session

We assign a separate Telegram bot (separate BotFather registration and token) to each Session anchored to its Workspace. A single multiplexing bot with explicit session-switching commands was rejected: it increases the risk of context bleed and undermines continuity integrity across efforts. Operational cost (more bots, secrets, webhook endpoints) is accepted in exchange for hard separation at Telegram’s UX boundary.
