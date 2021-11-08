import * as path from 'path';

const Config = {
  // 基础文件路径
  dirname: (url: string, ...arg)=>{
    const result = new RegExp(/^[.ts]$/);
    if(result.test(url)) {
      url = url.replace(".ts", ".js")
    }
    return path.join(__dirname, `../${url}`, ...arg)
  }
}

export default Config
