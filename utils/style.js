function style(){
  return `
    body {
      background: #F8F8F8;
      width: 100%;
      font-size: 35px !important;
    }
    
    .item {
      width: 100%;
      background: #FFFFFF;
      margin-top: 20px;
      display: flex;
      align-items: center;
      padding: 30px 10px;
      box-sizing: border-box;
    }
    
    .item .menu {
      width: 200px;
      /* height: 100%; */
      text-align: center;
    }
    
    .item .submenus {
      flex: 1;
    }
    
    .item .submenus .subitem {
      border-left: 1px solid #DDDDDD;
      border-bottom: 1px solid #DDDDDD;
      padding: 15px;
    }
    
    .item .submenus .subitem:last-child {
      border-bottom: none;
    }
    
    a,
    a:link,
    a:visited,
    a:hover,
    a:active {
      text-decoration: none;
      color: inherit;
    }
    
    {
      border-top: 1px solid #DDDDDD;
      padding-left: 20px;
      box-sizing: border-box;
    }
    
    ._submenus {
      background: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px;
      border-bottom: 1px solid #dddddd;
    }
    
    ._submenus:last-child {
      border: none;
    }
    
    ._submenus img {
      width: 20px;
      height: 20px;
    }
  `
}
module.exports = style