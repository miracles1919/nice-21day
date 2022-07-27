import { AtList, AtListItem, AtCard } from 'taro-ui';
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { ITrainingList, ITraining } from '@nice-21day/shared';
import { getCompList } from '../../service/home';
import 'taro-ui/dist/style/components/button.scss'; // 按需引入
import './index.less';
const ItemCard = (props) => {
  const { singledata } = props;
  const { name, title, description } = singledata;
  return (
    <AtCard note={description} extra={name} title={title}>
      啦啦啦啦 我是训练营
    </AtCard>
  );
};
export default function HomePage(props) {
  const [compList, setCompList] = useState([]);
  useEffect(() => {
    getCompList({
      page: 1,
      size: 10,
      progress: 'registering',
    }).then((data: ITrainingList) => {
      setCompList(data.rows || []);
    });
  }, []);
  const handleClick = (e) => {
    console.log(e.target.tagName);
  };
  return (
    <AtList>
      {compList.map((item:ITraining, index) => {
        return <ItemCard singledata={item} key={index}></ItemCard>;
      })}
    </AtList>
  );
}
