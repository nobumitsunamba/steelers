-- messages テーブル定義（PostgreSQL）
-- 試合（match_id）ごとのファンの応援メッセージを保存する。
CREATE TABLE IF NOT EXISTS messages (
    id          BIGSERIAL PRIMARY KEY,
    match_id    TEXT        NOT NULL,
    name        TEXT        NOT NULL,
    body        VARCHAR(200) NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- match_id での絞り込み・新しい順取得を高速化するためのインデックス。
CREATE INDEX IF NOT EXISTS idx_messages_match_id_created_at
    ON messages (match_id, created_at DESC);
