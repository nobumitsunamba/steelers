'use strict';

const { query } = require('../shared/db');
const { jsonResponse } = require('../shared/http');

// GET /api/messages?match_id=...
// messagesテーブルから取得（新しい順）。match_id 指定時は絞り込み。
// ルート登録は messages.js に集約しているため、ここではハンドラのみを export する。
async function getMessages(request, context) {
  try {
    const matchId = request.query.get('match_id');

    let result;
    if (matchId) {
      result = await query(
        'SELECT id, match_id, name, body, created_at FROM messages WHERE match_id = $1 ORDER BY created_at DESC',
        [matchId]
      );
    } else {
      result = await query(
        'SELECT id, match_id, name, body, created_at FROM messages ORDER BY created_at DESC'
      );
    }

    return jsonResponse(200, result.rows);
  } catch (err) {
    context.error('getMessages failed:', err);
    return jsonResponse(500, { error: 'Failed to fetch messages' });
  }
}

module.exports = { getMessages };
