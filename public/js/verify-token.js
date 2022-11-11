async function verifyToken() {
  // 서버의 verifyToken API로 fetch 요청
  if (document.cookie.includes("jwt_token")) {
    console.log("------------ 토큰 검증 시작 ------------");
    const verifyResult = await fetch("/api/auth/verifyToken")
      .then(async (res) => {
        const result = await res.json();
        // 서버가 200대의 status code를 반환한 경우 (검증 성공) => return result 으로 then 문으로 result 전달
        if (res.ok) {
          return result;
        }

        // 그 외의 status code를 반환한 경우 (검증 실패) => return Promise.reject(result) 로 catch 문으로 result 전달
        return Promise.reject(result);
      })
      .then((result) => {
        // 로그인 성공 확인용 코드 (추후 삭제 예정)
        alert("토큰 검증 성공!");
        console.log("로그인 성공 시 받게 되는 result");
        console.log(result);

        const loggedInUser = result;

        return { verifySucceed: true, loggedInUser };
      })
      .catch((e) => {
        // 로그인 실패 확인용 코드 (추후 삭제 예정)
        alert(e);

        return { verifySucceed: false };
      });

    console.log("------------ 토큰 검증 완료 ------------");
    return verifyResult;
  } else {
    console.log(
      "------------ 브라우저에 'jwt_token'이라는 이름의 쿠키가 없으므로 토큰 검증 수행 X ------------"
    );
    return false;
  }
}

export { verifyToken };
