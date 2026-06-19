'use strict';

const { query } = require('../shared/db');
const { jsonResponse } = require('../shared/http');

// POST /api/messages
// ボディ: { match_id, name, body }
// バリデーション: 全フィールド必須、body は200文字以内。
// ルート登録は messages.js に集約しているため、ここではハンドラのみを export する。
async function postMessages(request, context) {
  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const { match_id, name, body } = payload || {};

  // --- バリデーション ---
  const errors = [];
  if (match_id === undefined || match_id === null || `${match_id}`.trim() === '') {
    errors.push('match_id is required');
  }
  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('name is required');
  }
  if (typeof body !== 'string' || body.trim() === '') {
    errors.push('body is required');
  } else if (body.length > 200) {
    errors.push('body must be 200 characters or fewer');
  }

  if (errors.length > 0) {
    return jsonResponse(400, { error: 'Validation failed', details: errors });
  }

  // --- INSERT ---
  try {
    const result = await query(
      'INSERT INTO messages (match_id, name, body) VALUES ($1, $2, $3) RETURNING id, match_id, name, body, created_at',
      [match_id, name.trim(), body.trim()]
    );

    return jsonResponse(201, result.rows[0]);
  } catch (err) {
    context.error('postMessages failed:', err);
    return jsonResponse(500, { error: 'Failed to create message' });
  }
}

module.exports = { postMessages };
