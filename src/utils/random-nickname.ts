export const randomNickname = () => {
  const adjectives = [
    "멋진",
    "행복한",
    "재치있는",
    "빠른",
    "조용한",
    "대담한",
    "용감한",
    "운 좋은",
    "복슬복슬한",
    "느긋한",
    "명랑한",
    "엉뚱한",
    "신중한",
    "열정적인",
    "부드러운",
    "기발한",
    "차분한",
    "당찬",
    "튼튼한",
    "귀여운",
  ];

  const animals = [
    "여우",
    "호랑이",
    "코알라",
    "판다",
    "매",
    "수달",
    "고래",
    "곰",
    "고양이",
    "늑대",
    "다람쥐",
    "사슴",
    "삵",
    "청설모",
    "너구리",
    "치타",
    "햄스터",
    "토끼",
    "삽살개",
    "부엉이",
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 1000);

  return `${adjective}${animal}${number}`;
};
