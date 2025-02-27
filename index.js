import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `## <p align="center">🚀 About Me</p>
<p align="center">👩‍💻 Backend Developer</p>

## <p align="center">🛠️ Skills</p>
<p align="center">
    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=ssongjunu&layout=compact" />
</p>

<p align="center"> 
    <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" /> 
    <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" /> 
    <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" /> 
    <img src="https://img.shields.io/badge/JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white" /> 
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" /> 
    <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white" /> 
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /> 
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> 
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> 
    <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white" /> 
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" /> 
</p>

## <p align="center">🔗 Links</p>
<p align="center">
    <a href="https://www.instagram.com/ssongjunu"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a>
    <a href="https://bigdwarf.blog"><img src="https://img.shields.io/badge/Tistory-000000?style=for-the-badge&logo=tistory&logoColor=white" /></a>
    <a href="mailto:bigdwarf_@naver.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
</p>

<p align="center">
  <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fssongjunu%2Fhit-counter&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>
</p>

## <p align="center">📕 Latest Blog Posts</p>

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://bigdwarf.blog/rss'); // 본인의 블로그 주소

    text += `<table align="center">`;

    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 10; i++) {
        const { title, link, category, pubDate } = feed.items[i];
        
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        // 날짜 포맷을 yyyy-mm-dd 로 변환
        const date = new Date(pubDate);
        const formattedDate = `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}`;

        // 링크 제목에 yyyy-mm-dd - [category] - 제목 형식으로 추가
        text += `<tr><td align="left"><a href='${link}' target='_blank'>${formattedDate} - ${title}</a></td></tr>`;
    }

    text += `</table>`;

    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    
    console.log('업데이트 완료');
})();
