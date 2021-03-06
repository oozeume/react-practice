import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import BucketList from './BucketList';
import Detail from './Detail';
import NotFound from './NotFound';
import Progress from './Progress';
import Spinner from './Spinner';

import styled from 'styled-components';


// 리덕스 스토어와 연결하기 위한 connect 호출
import { connect } from 'react-redux';
// 리덕스 모듈에서 (bucket 모듈에서) 액션 생성함수 2개 가져온다
import { loadBucket, createBucket, loadBucketFB, addBucketFB } from './redux/modules/bucket';

import { firestore } from './firebase';

// connect를 하기위한 함수 2가지 필요
// 1) redux Store에 있는 상태값을 props의 형태로 받아오기위한 함수 (컴포넌트에 넣어주는 친구)
const mapStateToProps = (state) => ({
    bucket_list: state.bucket.list,
    is_loaded: state.bucket.is_loaded,
});

// 2) 값을 변화시키기 위한 액션생성함수를 props로 받아오기위한 함수 (Dispatch를 Props로 넘겨줄거야)
const mapDispatchToProps = (dispatch) => ({
    // 우리가 만들었던 액션 생성 함수를 넣어준다. Action을 반환해야 Reducer에서 처리할수있음
    load: () => {
        dispatch(loadBucketFB());
    },
    create: (new_item) => {
        console.log(new_item);
        dispatch(addBucketFB(new_item));
    }

});

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class App extends React.Component {
    constructor(props) {
        super(props);
        // App 컴포넌트의 state를 정의해줍니다.
        this.state = {
        };

        //Ref선언
        this.text = React.createRef();
        // 아래 render()에서 먼저 작성해줬음. text가져올꺼니까 text로 작성
        // createRef()는 Ref 생성해주는 친구
        // input에 입력된 텍스트 가져오고싶어 -> 리액트 요소에서 가져온다.
    }

    componentDidMount() {
        this.props.load();
    }

    //Ref값 가져와서 연결해줄때 add해주는 함수 만들어줘야겠죠 (input에 text입력하고 추가하기 버튼 눌렀을때)
    addBucketList = () => {
        const new_item = this.text.current.value; // input에서 value값 가져오면 담아줄 변수를 만들어준다. 
        this.props.create(new_item);
    };

    // 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
    render() {
        console.log(this.props.is_loaded);
        return (
            <AppBox>


                <Container>
                    <Title>내 버킷리스트</Title>
                    {!this.props.is_loaded ? (<Spinner />) : (
                        <React.Fragment>
                            <Progress />
                            <Line />
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={(props) => (
                                        <BucketList
                                            bucket_list={this.state.bucket_list}
                                            history={this.props.history}
                                        />
                                    )}
                                />
                                <Route path="/detail/:index" component={Detail} />
                                <Route render={(props) => (<NotFound history={this.props.history} />)} />
                            </Switch>
                        </React.Fragment>
                    )}
                </Container>

                <Input>
                    <input type="text" ref={this.text} />
                    <button onClick={this.addBucketList}>추가하기</button>
                </Input>
                <button onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}>위로가기</button>
                    
                )}
            </AppBox>
        );
    }
}

const AppBox = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #{$bgColor};
    padding: 32px;
    box-sizing: border-box;
`;

const Container = styled.div`
    max-width: 350px;
    min-height: 80vh;
    background-color: #fff;
    padding: 16px;
    margin: 20px auto;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

const Title = styled.h1`
    color: orange;
    text-align: center;
`;

const Line = styled.hr`
   margin: 16px 0px;
   border: 1px dotted #ddd;
`;

const Input = styled.div`
   max-width: 350px;
   padding: 16px;
   margin: 20px auto;
   border-radius: 5px;
   border: 1px solid #ddd;
`;

// 처음에 withRouter적용
// connect 로 묶어준다. 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));