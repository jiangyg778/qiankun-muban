import { Card } from "antd";
import { useCallback } from "react";
import "./index.less";
import { useNavigate } from "react-router-dom";
function Control() {
  const list = [
    { key: 1, name: "NPM私服包管理", url: "http://124.221.131.186:4873/" },
    { key: 2, name: "Jenkins自动发布", url: "http://124.221.131.186:8080/" },
    { key: 3, name: "YiRan-Vue组件库", url: "http://124.221.131.186/#/UI" },
    { key: 4, name: "gitLab私有仓库", url: "http://124.221.131.186:8082/" },
  ];
  const navigate = useNavigate();
  const goLink = useCallback((i) => {
    window.location.href = i;
  }, []);

  return (
    <div className="control">
      {list.map((item) => (
        <div
          style={{ width: "48%", marginBottom: "20px" }}
          className="cardItem"
          key={item.key}
        >
          <Card onClick={() => goLink(item.url)}>
            <p>{item.name}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}
export default Control;
