'use strict';

const { app } = require('@azure/functions');
const { putMessage } = require('./putMessages');
const { deleteMessage } = require('./deleteMessages');
const { preflightResponse, jsonResponse } = require('../shared/http');

// /api/messages/{id} のルート登録を1つに集約する。
// 同一ルートを複数の関数で登録するとメソッドによっては404になるため、
// ここでメソッドを振り分けて各ハンドラを呼び出す。
app.http('messageById', {
  methods: ['PUT', 'DELETE', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'messages/{id}',
  handler: async (request, context) => {
    if (request.method === 'OPTIONS') {
      return preflightResponse();
    }
    if (request.method === 'PUT') {
      return putMessage(request, context);
    }
    if (request.method === 'DELETE') {
      return deleteMessage(request, context);
    }
    return jsonResponse(405, { error: 'Method not allowed' });
  },
});
