// 下载文件
export const downloadFile = (fileName: string, content: string, fileType = "text/plain") => {
  // 创建Blob对象表示要下载的数据
  const blob = new Blob([content], { type: fileType });

  // 创建一个指向Blob的URL
  const url = URL.createObjectURL(blob);

  // 创建隐藏的可下载链接
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.download = fileName;

  // 触发点击以下载文件
  document.body.appendChild(link);
  link.click();

  // 清理
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
