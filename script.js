// =============================================================
// コベルコ神戸スティーラーズ 2025-26シーズン 試合データ
// -------------------------------------------------------------
// データは公開情報（各種報道・検索結果）をもとに作成しています。
// 公式の最新・正確な情報は https://www.kobesteelers.com/ をご確認ください。
// 更新する場合はこの配列を編集するだけでOKです。
//   result: "win" = 勝利 / "loss" = 敗戦
//   homeAway: "H" = ホーム / "A" = アウェイ
//   highlight: true で優勝など特別な試合を強調表示
// =============================================================

const STEELERS = "コベルコ神戸スティーラーズ";

// レギュラーシーズン（ディビジョン1）
const leagueMatches = [
  {
    round: "第1節",
    date: "2025.12.13",
    opponent: "クボタスピアーズ船橋・東京ベイ",
    homeAway: "H",
    steelersScore: 28,
    opponentScore: 33,
    result: "loss",
    venue: "ノエビアスタジアム神戸",
  },
  {
    round: "第2節",
    date: "2025.12.21",
    opponent: "三重ホンダヒート",
    homeAway: "A",
    steelersScore: 28,
    opponentScore: 23,
    result: "win",
    venue: "ホンダヒートフィールド",
  },
  {
    round: "第3節",
    date: "2025.12.27",
    opponent: "トヨタヴェルブリッツ",
    homeAway: "H",
    steelersScore: 49,
    opponentScore: 29,
    result: "win",
    venue: "ノエビアスタジアム神戸",
  },
  {
    round: "第4節",
    date: "2026.01.10",
    opponent: "東京サントリーサンゴリアス",
    homeAway: "A",
    steelersScore: 22,
    opponentScore: 20,
    result: "win",
    venue: "味の素スタジアム",
  },
  {
    round: "第5節",
    date: "2026.01.17",
    opponent: "リコーブラックラムズ東京",
    homeAway: "H",
    steelersScore: 67,
    opponentScore: 21,
    result: "win",
    venue: "ノエビアスタジアム神戸",
  },
  {
    round: "第6節",
    date: "2026.01.24",
    opponent: "横浜キヤノンイーグルス",
    homeAway: "A",
    steelersScore: 38,
    opponentScore: 32,
    result: "win",
    venue: "ニッパツ三ツ沢球技場",
  },
  {
    round: "第8節",
    date: "2026.02.15",
    opponent: "静岡ブルーレヴズ",
    homeAway: "H",
    steelersScore: 34,
    opponentScore: 33,
    result: "win",
    venue: "ノエビアスタジアム神戸",
  },
  {
    round: "第9節",
    date: "2026.02.21",
    opponent: "東芝ブレイブルーパス東京",
    homeAway: "A",
    steelersScore: 40,
    opponentScore: 24,
    result: "win",
    venue: "秩父宮ラグビー場",
  },
  {
    round: "第10節",
    date: "2026.02.28",
    opponent: "埼玉パナソニックワイルドナイツ",
    homeAway: "H",
    steelersScore: 78,
    opponentScore: 19,
    result: "win",
    venue: "ノエビアスタジアム神戸",
  },
];

// プレーオフトーナメント
const playoffMatches = [
  {
    round: "準決勝",
    date: "2026.05.30",
    opponent: "東京サントリーサンゴリアス",
    homeAway: "H",
    steelersScore: 69,
    opponentScore: 23,
    result: "win",
    venue: "プレーオフトーナメント 準決勝",
  },
  {
    round: "決勝",
    date: "2026.06.07",
    opponent: "クボタスピアーズ船橋・東京ベイ",
    homeAway: "N",
    steelersScore: 22,
    opponentScore: 13,
    result: "win",
    venue: "国立競技場（MUFGスタジアム）",
    highlight: true,
  },
];

// シーズン全体のサマリー（ヒーロー部分に表示）
const seasonStats = [
  { value: "16勝2敗", label: "リーグ戦成績" },
  { value: "1位", label: "リーグ戦順位" },
  { value: "優勝", label: "プレーオフ（クラブ初）" },
];

// ------------------------------------------------------------------
// 描画ロジック
// ------------------------------------------------------------------

function createMatchCard(match) {
  const card = document.createElement("article");
  card.className = `match-card ${match.result}`;
  if (match.highlight) card.classList.add("highlight");
  card.dataset.result = match.result;

  // ホーム/アウェイに応じて並びを変える
  const isHome = match.homeAway === "H";
  const steelersTeam = `<span class="team steelers ${isHome ? "home" : "away"}">${STEELERS}${
    match.highlight ? '<span class="trophy">🏆</span>' : ""
  }</span>`;
  const opponentTeam = `<span class="team ${isHome ? "away" : "home"}">${match.opponent}</span>`;

  const scoreText = isHome
    ? `${match.steelersScore} - ${match.opponentScore}`
    : `${match.opponentScore} - ${match.steelersScore}`;

  const homeTeam = isHome ? steelersTeam : opponentTeam;
  const awayTeam = isHome ? opponentTeam : steelersTeam;

  const resultLabel = match.result === "win" ? "WIN" : "LOSS";
  const haLabel = match.homeAway === "N" ? "中立地" : isHome ? "HOME" : "AWAY";

  card.innerHTML = `
    <div class="match-top">
      <span class="match-round">${match.round} ・ ${match.date}</span>
      <span class="match-result ${match.result}">${resultLabel}</span>
    </div>
    <div class="match-teams">
      ${homeTeam}
      <span class="score">${scoreText}</span>
      ${awayTeam}
    </div>
    <div class="match-venue">${haLabel}｜${match.venue}</div>
  `;
  return card;
}

function renderMatches(targetId, matches) {
  const container = document.getElementById(targetId);
  if (!container) return;
  container.innerHTML = "";
  matches.forEach((m) => container.appendChild(createMatchCard(m)));
}

function renderStats() {
  const container = document.getElementById("hero-stats");
  if (!container) return;
  container.innerHTML = seasonStats
    .map(
      (s) =>
        `<div class="stat-card"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`
    )
    .join("");
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      document.querySelectorAll("#match-list .match-card").forEach((card) => {
        const show = filter === "all" || card.dataset.result === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

// ------------------------------------------------------------------
// 応援メッセージ掲示板
// ------------------------------------------------------------------

// ドロップダウン用に全試合を結合し、安定した match_id を付与する。
// 日付はシーズン内で一意なので、これを識別子として利用する。
const allMatches = [...leagueMatches, ...playoffMatches].map((m) => ({
  matchId: m.date, // 例: "2025.12.13"
  label: `${m.date} ${m.round} vs ${m.opponent}`,
}));

// 投稿日時を読みやすい日本語表記に整形する。
function formatDateTime(value) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  const pad = (n) => `${n}`.padStart(2, "0");
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

// HTMLエスケープ（XSS対策）。
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 試合のラベルを matchId から引く（一覧表示用）。
function matchLabelFor(matchId) {
  const found = allMatches.find((m) => m.matchId === matchId);
  return found ? found.label : matchId;
}

function populateMatchSelect() {
  const select = document.getElementById("form-match");
  if (!select) return;
  select.innerHTML = allMatches
    .map((m) => `<option value="${escapeHtml(m.matchId)}">${escapeHtml(m.label)}</option>`)
    .join("");
}

function renderMessages(messages) {
  const list = document.getElementById("message-list");
  const count = document.getElementById("message-count");
  if (!list) return;

  if (count) count.textContent = messages.length ? `(${messages.length})` : "";

  if (!messages.length) {
    list.innerHTML = '<p class="message-empty">まだメッセージはありません。最初の応援を投稿しよう！</p>';
    return;
  }

  list.innerHTML = messages
    .map(
      (m) => `
      <article class="message-card">
        <div class="message-head">
          <span class="message-name">${escapeHtml(m.name)}</span>
          <span class="message-date">${escapeHtml(formatDateTime(m.created_at))}</span>
        </div>
        <p class="message-body">${escapeHtml(m.body)}</p>
        <span class="message-match">${escapeHtml(matchLabelFor(m.match_id))}</span>
      </article>`
    )
    .join("");
}

async function loadMessages() {
  const status = document.getElementById("message-status");
  try {
    const res = await fetch("/api/messages");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderMessages(Array.isArray(data) ? data : []);
  } catch (err) {
    if (status) {
      status.textContent = "メッセージの読み込みに失敗しました。時間をおいて再度お試しください。";
    }
  }
}

function setFeedback(message, type) {
  const el = document.getElementById("form-feedback");
  if (!el) return;
  el.textContent = message || "";
  el.className = "form-feedback" + (type ? ` ${type}` : "");
}

function setupMessageForm() {
  const form = document.getElementById("message-form");
  if (!form) return;

  const submitBtn = document.getElementById("submit-btn");
  const bodyInput = document.getElementById("form-body");
  const charCount = document.getElementById("char-count");

  // 文字数カウンター
  if (bodyInput && charCount) {
    const updateCount = () => {
      charCount.textContent = `${bodyInput.value.length} / 200`;
    };
    bodyInput.addEventListener("input", updateCount);
    updateCount();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setFeedback("");

    const matchId = document.getElementById("form-match").value;
    const name = document.getElementById("form-name").value.trim();
    const body = bodyInput.value.trim();

    // クライアント側バリデーション
    if (!matchId) {
      setFeedback("試合を選択してください。", "error");
      return;
    }
    if (!name) {
      setFeedback("お名前を入力してください。", "error");
      return;
    }
    if (!body) {
      setFeedback("メッセージを入力してください。", "error");
      return;
    }
    if (body.length > 200) {
      setFeedback("メッセージは200文字以内で入力してください。", "error");
      return;
    }

    // 送信中はボタンを無効化
    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = "送信中...";

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_id: matchId, name, body }),
      });

      if (!res.ok) {
        let detail = "";
        try {
          const errData = await res.json();
          detail = errData.error || (errData.details && errData.details.join("、")) || "";
        } catch (_) {
          /* JSONでない場合は無視 */
        }
        throw new Error(detail || `送信に失敗しました（HTTP ${res.status}）`);
      }

      // 成功：フォームをリセットしてリスト更新
      form.reset();
      if (charCount) charCount.textContent = "0 / 200";
      setFeedback("メッセージを投稿しました！", "success");
      await loadMessages();
    } catch (err) {
      setFeedback(err.message || "送信に失敗しました。時間をおいて再度お試しください。", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderMatches("match-list", leagueMatches);
  renderMatches("playoff-list", playoffMatches);
  setupFilters();

  // 掲示板
  populateMatchSelect();
  setupMessageForm();
  loadMessages();
});
