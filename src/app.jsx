import { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const qs = new URLSearchParams(window.location.search);

  const [dateText, setDateText] = useState("");
  const [plate, setPlate] = useState("吉A513PQ");

  function formatDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  useEffect(() => {
    const param = qs.get("date");
    if (param && /^\d{4}-\d{2}-\d{2}$/.test(param)) {
      setDateText(param);
    } else {
      setDateText(formatDate(new Date()));
    }

    const p = qs.get("plate");
    if (p) setPlate(p);
  }, []);

  return (
    <>
      <header className="appbar">
        <button className="back">◀</button>
        <div className="title">预约信息查询</div>
        <div className="placehold"></div>
      </header>

      <main className="page">
        <section className="card">
          <div className="card-head">
            <div className="date-wrap">
              <div className="date-text">{dateText}</div>
            </div>
            <div className="plate-wrap">
              <div className="plate">{plate}</div>
              <span className="badge">已生效</span>
            </div>
          </div>

          <div className="info">
            <div className="row">
              <span className="label">李云扬</span>
              <span className="desc">体育教学部</span>
            </div>
            <div className="row">
              <span className="desc">嘉定校区 - 昌吉东路199号</span>
            </div>
            <div className="row">
              <span className="desc">被访人：孙天然</span>
            </div>
          </div>

          <div className="qr-wrap">
            <img src="/qr.png" alt="二维码" className="qr" />
          </div>
        </section>
          <div className="btn-area">
            <button className="btn outline">取消预约</button>
          </div>
        

        <div className="divider">——— 我是有底线的 ———</div>
      </main>
    </>
  );
}
