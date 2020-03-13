import loadinggif from './img/loading.gif'
import bg from './img/bg.jpg'
import headbg from './img/headbg.png'
import line from './img/line.png'
//index.jsx
export const canvas={
    position: 'absolute',
    width:'100%',
    left: 0,
    top: 0,
    height: '99%',
    zIndex: 1,
    opacity: .2
}
export const bodystyle={
    backgroundColor:'#000d4a',
    backgroundImage: 'url('+bg+')',
    backgroundPosition:'center',
    backgroundSize:'100% 100%',//contain
    color:'#666',
    fontSize: 14
}
export const headstyle={
    backgroundImage: 'url('+headbg+')',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center',
    backgroundSize:'cover',
    height:72,
    position: 'relative',
    zIndex: 100,
}
export const headtitle={
            color:'#fff',
            textAlign: 'center',
            fontSize: 24,
            lineHeight:2,
}
export const weather={ 
            position:'absolute',
            right:10,
            top:0,
            lineHeight: 3,
}
export const weatherspan={
    color:'#fff',
}
export const mainbox={
    padding:5
}
//begin next jsx
export const boxall={
    margin:10,
    borderWidth: 1,
    borderStyle:'solid',
    borderColor:'rgba(25,186,139,.17)',
    //borderColor:'#02a6b5',
    padding:0,
    backgroundImage: 'url('+line+')',
    //backgroundSize: '100%',
    //backgroundPosition:'auto',
    position: 'relative',
    //marginBottom: 1,
    zIndex: 10,
    height: '100%'
}
export const alltitle={
            fontSize:18,
            color:'#fff',
            textAlign: 'center',
            lineHeight: 2
}
export const allnav={
    height: 'calc(100% - 30px)'
}
export const boxfoot={
            position:'absolute',
            bottom: 0,
            width: '100%',
            left: 0
}
//map jsx
export const mapstyle={
            position:'relative',
            height: 70,
            zIndex: 9,
        }
export const map1={
            position:'absolute',
            opacity: 0.5,
            width:80,
            zIndex: 2,
            top:5,
            left: 5,
            animation: 'myfirst2 15s infinite linear',
        }
export const map2={
            position:'absolute',
            opacity: 0.2,
            width:80,
            zIndex: 3,
            top:5,
            left: 5,
            animation: 'myfirst2 15s infinite linear'
        }
export const map3={
            position:'absolute',
            opacity: 0.5,
            width:80,
            zIndex: 1,
            top:5,
            left: 5,
        }
export const map4={
            width: '200%',
            height:7,
            position: 'relative',
            left: '-50%',
            top: '4%',
            marginTop: 2,
            zIndex: 5,
        }
export const bar={
    backgroundColor:'rgba(101,132,226,.1)'
}
export const barbox={
    border: '1px solid rgba(25,186,139,.17)',
    position: 'relative'
}
export const barboxli={
    float:'left',
    listStyleType:'none',
    width:'50%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 100
}