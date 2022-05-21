import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

interface SendData {
  sheet_name: "신청서";
  team: string;
  user1: string;
  "user1-phone": string;
  "user1-addr": string;
  user2: string;
  "user2-phone": string;
  "user2-addr": string;
}
function App() {
  const [data, setData] = useState<SendData>({
    sheet_name: "신청서",
    team: "",
    user1: "",
    "user1-phone": "",
    "user1-addr": "",
    user2: "",
    "user2-phone": "",
    "user2-addr": "",
  });
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: resData } = await axios.get(
        "https://script.google.com/macros/s/AKfycbyVl3fRUlQ5WeJQ-EwXie7Hcuxel_9QF5pTDsvAFpcQSvPnyhsT5i_ZM-XfYVqsI9HE0Q/exec",
        {
          params: data,
        }
      );
      Swal.fire({
        title: `${
          resData.row - 1
        }번째로 신청 되었습니다.\n신청되었더라도 입금하셔야\n신청이 완료됩니다.`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: `신청이 되지 않았습니다.\n지속된다면 운영자에게 연락주세요.`,
        icon: "error",
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof SendData;
    setData({ ...data, [key]: e.target.value });
  };
  return (
    <Container>
      <h1>티츄쟁이들의 진검승부</h1>
      <Info>
        <h2>신청전 안내사항</h2>
        <ul>
          <li>신청은 신청서 작성 후 입금 순서대로 선착순으로 진행됩니다.</li>
          <li>환불이 필요할 때는 팀원 1의 연락처로 연락드립니다.</li>
          <li>궁금한점은 (인재씨 카톡? 전화번호?)로 연락주세요.</li>
        </ul>
      </Info>
      <FormBox onSubmit={sendData}>
        <label>
          <span>팀 이름</span>
          <input
            type="text"
            value={data.team}
            id="team"
            name="team"
            onChange={handleChange}
          />
        </label>
        <legend>
          <label htmlFor="user1">
            <span>팀원1</span>
            <input
              type="text"
              value={data.user1}
              id="user1"
              name="user1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="user1-phone">
            <span>팀원 1 전화번호</span>
            <input
              type="text"
              value={data["user1-phone"]}
              id="user1-phone"
              name="user1-phone"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="user1-addr">
            <span>팀원 1 주소(구까지만)</span>
            <input
              type="text"
              value={data["user1-addr"]}
              id="user1-addr"
              name="user1-addr"
              onChange={handleChange}
            />
          </label>
        </legend>
        <legend>
          <label htmlFor="user2">
            <span>팀원2</span>
            <input
              type="text"
              value={data.user2}
              id="user2"
              name="user2"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="user2-phone">
            <span>팀원 2 전화번호</span>
            <input
              type="text"
              value={data["user2-phone"]}
              id="user2-phone"
              name="user2-phone"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="user2-addr">
            <span>팀원 2 주소(구까지만)</span>
            <input
              type="text"
              value={data["user2-addr"]}
              id="user2-addr"
              name="user2-addr"
              onChange={handleChange}
            />
          </label>
        </legend>
        <button>제출하기</button>
      </FormBox>
    </Container>
  );
}

export default App;
const Container = styled.div`
  h1 {
    margin: 30px 0;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormBox = styled.form`
  width: calc(100% - 40px);
  max-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0 50px;
  legend {
    border: 1px solid #dcdcdc;
    padding: 20px;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 12px;
  }
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    width: 100%;
    input {
      margin-top: 4px;
      padding: 5px 12px;
      border: 1px solid #000;
      font-size: 16px;
    }
  }
  button {
    background: #2a47ad;
    color: white;
    width: 100%;
    height: 40px;
    cursor: pointer;
    &:disabled {
      background: #bbb;
      cursor: default;
    }
  }
`;

const Info = styled.article`
  width: calc(100% - 40px);
  max-width: 500px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 8px;
    }
  }
`;
