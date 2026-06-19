'use strict';

const { app } = require('@azure/functions');
const { getMessages } = require('./getMessages');
const { postMessages } = require('./postMessages');
const { preflightResponse, jsonResponse } = require('../shared/http');

// /api/messages のルート登録を1つに集約する。
// 同一ルートを複数の関数で登録するとメソッドによっては404になるため、
// ここでメソッドを振り分けて各ハンドラを呼び出す。
app.http('messages', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'messages',
  handler: async (request, context) => {
    if (request.method === 'OPTIONS') {
      return preflightResponse();
    }
    if (request.method === 'GET') {
      return getMessages(request, context);
    }
    if (request.method === 'POST') {
      return postMessages(request, context);
    }
    return jsonResponse(405, { error: 'Method not allowed' });
  },
});
