function style(){
  return `
    body {
      background: #F8F8F8;
    }
    
    .mobile_adapter {
      width: 100%;
      /* height: 100%; */
      font-size: 35px !important;
    }
    
    .mobile_adapter .item {
      width: 100%;
      background: #FFFFFF;
      margin-top: 20px;
      display: flex;
      align-items: center;
      padding: 30px 10px;
      box-sizing: border-box;
    }
    
    .mobile_adapter .item .menu {
      width: 200px;
      /* height: 100%; */
      text-align: center;
    }
    
    .mobile_adapter .item .submenus {
      flex: 1;
    }
    
    .mobile_adapter .item .submenus .subitem {
      border-left: 1px solid #DDDDDD;
      border-bottom: 1px solid #DDDDDD;
      padding: 15px;
    }
    
    .mobile_adapter .item .submenus .subitem:last-child {
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
    
    .mobile_adapter {
      border-top: 1px solid #DDDDDD;
      padding-left: 20px;
      box-sizing: border-box;
    }
    
    .mobile_adapter ._submenus {
      background: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px;
      border-bottom: 1px solid #dddddd;
    }
    
    .mobile_adapter ._submenus:last-child {
      border: none;
    }
    
    .mobile_adapter ._submenus img {
      width: 20px;
      height: 20px;
    }
  `
}
module.exports = style