window.onload = () => {
  // tab切换
  const tabList = document.querySelectorAll(".tops > div");
  const content_ul = document.querySelector(".content_ul");
  const more = document.querySelector("#more");
   // 查看更多
   more.addEventListener("click", () => {
    window.open("/dh-publicity-web/manual/manual.html", "_self");
  });
  // 调用render函数 默认填充第一组数据，给每个list 注册跳转的点击事件
  render("public/title.json").then((list) => {
    list.data[0].list.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>•</span>${item.text}`;
      content_ul.appendChild(li);
      li.addEventListener("click", () => {
        window.open(`/dh-publicity-web/manual/manual.html?menuId=${item.id}`, "_self");
      });
    });
  });

  // sessionStorage.setItem("tab", 0);
  tabList.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      content_ul.innerHTML = "";
      // 移除所有兄弟元素的 select_tabs 类
      tabList.forEach((siblingTab) => {
        if (siblingTab !== tab) {
          siblingTab.classList.remove("select_tabs");
        }
      });
      // 添加或移除 select_tabs 类
      tab.classList.add("select_tabs");
      sessionStorage.setItem("tab", index);
      render("public/title.json").then((list) => {
        list.data[index].list.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = `<span>•</span>${item.text}`;
          content_ul.appendChild(li);
          li.addEventListener("click", () => {
            window.open(`/dh-publicity-web/manual/manual.html?menuId=${item.id}`, "_self");
          });
        });
      });
    });
  });
};

// 获取本地json数据
const render = (path = "public/title.json") => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // JSON文件已成功加载
          const jsonData = JSON.parse(xhr.responseText);
          //   console.log(jsonData);
          resolve(jsonData);
        } else {
          // 请求失败
          reject(new Error("请求失败"));
        }
      }
    };

    xhr.send();
  });
};
