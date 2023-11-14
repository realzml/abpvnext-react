

export default function reFormatterMenu(menuData: any[], formatterAction: Function) {
  menuData.map(item => {
    if(item.name){
      item.name = formatterAction(item.name);
    }
    if (item.children && item.children?.length != 0) {
      reFormatterMenu(item.children, formatterAction);
    }
  });
}
