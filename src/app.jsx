import React, { useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";

function pad(n) {
  return n.toString().padStart(2, "0");
}
function formatFullDateTime(d) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${y}年${m}月${day}日 ${hh}:${mm}:${ss}`;
}
function formatMonthDay(d) {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${pad(m)}-${pad(day)}`;
}
function roundDownToHour(d) {
  const hh = pad(d.getHours());
  return `${hh}:00:00`;
}

export default function App() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000); // 每分钟更新一次
    return () => clearInterval(t);
  }, []);

  const fullDateTime = useMemo(() => formatFullDateTime(now), [now]);
  const monthDay = useMemo(() => formatMonthDay(now), [now]);
  const hour00 = useMemo(() => roundDownToHour(now), [now]);
  const minuteKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`;
// 🔹 二维码每分钟更新一次
const qrValue = useMemo(() => `tongji-pass://${minuteKey}`, [minuteKey]);
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#1F71D7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 页面标题 */}
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 20,
        }}
      >
        进校码
      </div>

      {/* 主体卡片 */}
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          background: "#E6F0FB",
          borderRadius: 20,
          marginTop: 16,
          padding: 16,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        {/* 校区与校徽 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 8,
              padding: "4px 8px",
              color: "#2C5AA0",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                background: "#2C5AA0",
                borderRadius: 2,
                marginRight: 6,
              }}
            ></div>
            嘉定校区
          </div>
          <img
            src="/tongji-logo.png"
            alt="同济大学"
            style={{
                height: 40,           // 图片高度可自行调
                objectFit: "contain",
            }}
          />
        </div>

        {/* 头像 */}
        <div
          style={{
            marginTop: 12,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/myphoto.jpg"
            alt="头像"
            style={{
              width: 260,
              height: 200,
              objectFit: "cover",
              borderRadius: 8,
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,.15)",
            }}
          />
        </div>

        {/* 姓名 */}
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            fontSize: 20,
            color: "#2C5AA0",
          }}
        >
          李云扬
        </div>

        {/* 时间 */}
        <div
          style={{
            textAlign: "center",
            marginTop: 6,
            fontSize: 22,
            fontWeight: "bold",
            color: "#1D3F7A",
          }}
        >
          {fullDateTime}
        </div>

        {/* 二维码 */}
        <div
          style={{
            marginTop: 12,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: 12,
              borderRadius: 8,
              boxShadow: "inset 0 0 0 3px #3DDC84",
            }}
          >
            <QRCode value={qrValue} size={260} />
          </div>
        </div>

        {/* 有效标识 */}
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            marginBottom: 8,
            fontSize: 34,
            fontWeight: "bold",
            color: "#26C05E",
          }}
        >
          有效
        </div>
      </div>

      {/* 预约信息 */}
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          marginTop: 16,
          marginBottom: 24,
          padding: "0 12px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: 8,
            display: "flex",
            gap: 8,
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.9)",
              borderRadius: 12,
              padding: "12px 16px",
              color: "#174A9B",
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.8 }}>
              预约时间 {monthDay}
            </div>
            <div style={{ fontSize: 24, fontWeight: "bold" }}>{hour00}</div>
          </div>
          <div
            style={{
              flex: 1.2,
              background: "rgba(255,255,255,0.9)",
              borderRadius: 12,
              padding: "12px 16px",
              color: "#174A9B",
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.8 }}>预约进校门</div>
            <div style={{ fontSize: 20, fontWeight: "bold" }}>嘉定西门</div>
          </div>
        </div>
      </div>

      {/* 底部指示条 */}
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          height: 4,
          background: "rgba(0,0,0,0.2)",
          borderRadius: 4,
          marginBottom: 12,
        }}
      ></div>
    </div>
  );
}
