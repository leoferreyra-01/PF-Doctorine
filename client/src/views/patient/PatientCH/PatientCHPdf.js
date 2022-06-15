import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import logo from './logo.png';

const PatientCHPdf = () => {
  // const SearchedPatient = useSelector(state => state.searchedPatient);
  // const { clinicalHistory } = useSelector(state => state);
  const user = JSON.parse(window.localStorage.getItem('user'));
  const patientCH = JSON.parse(window.localStorage.getItem('patientCH'));
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = day + '/' + month + '/' + year;
  // eslint-disable-next-line
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  // eslint-disable-next-line
  const poema = {
    name: 'Ernesto',
    lastName: 'Abril',
    content: 'contenido',
  };

  // console.log(data);
  console.log(user);
  // console.log(SearchedPatient);
  // console.log(clinicalHistory);
  console.log(window.localStorage.getItem('patientCH'));

  console.log(patientCH);

  const patientCHObj = Object.assign({}, patientCH);

  console.log(patientCHObj);

  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: 'white',
            padding: 10,
          }}
        >
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              height: '60px',
              borderRadius: '5px',
              border: 'solid',
              borderColor: '#009be5',
              marginBottom: '12px',
              borderWidth: '1px',
            }}
          >
            <View>
              <Image
                src={logo}
                alt="logo"
                style={{
                  width: '70px',
                  height: '70px',
                }}
              ></Image>
            </View>
            <View>
              <Text
                style={{
                  marginTop: '20px',
                  paddingLeft: '10px',
                  paddingRight: '20%',
                  width: '90%',
                  // display: 'flex',
                  // flexDirection: 'row',
                  // flexWrap: 'wrap',
                  fontSize: '20px',
                }}
              >
                {' '}
                Clinic History
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: '60px',
              borderRadius: '5px',
              border: 'solid',
              borderColor: '#009be5',
              marginBottom: '12px',
              borderWidth: '1px',
            }}
          >
            <View
              style={{
                marginTop: '15px',
                marginLeft: '15px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <View
                style={{
                  width: '90px',
                  height: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgb(214, 214, 214)',
                  borderStyle: 'none', // eslint-disable-next-line
                  borderStyle: 'solid',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '1px',
                  borderColor: 'rgb(7, 5, 48)',
                  marginRight: '19px',
                  marginBottom: '30px',
                }}
              >
                <Text
                  style={{
                    textAlign: 'left',
                    marginTop: '8px',
                    marginLeft: '8px',
                    color: '#666',
                    fontSize: '8px',
                  }}
                >
                  Documento
                </Text>
                <Text
                  style={{
                    // fontFamily: 'Roboto', 'Helvetica', 'Arial', sansSerif;
                    fontWeight: '400',
                    fontSize: '10px',
                    backgroundColor: 'rgb(214, 214, 214)',
                    // borderStyle: 'none',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    alignItems: 'flex-end',
                    marginBottom: '2px',
                  }}
                >
                  {user ? user.document : '...'}
                </Text>
              </View>
              <View
                style={{
                  width: '150px',
                  height: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgb(214, 214, 214)',
                  borderStyle: 'none', // eslint-disable-next-line
                  borderStyle: 'solid',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '1px',
                  borderColor: 'rgb(7, 5, 48)',
                  marginRight: '19px',
                  marginBottom: '30px',
                }}
              >
                <Text
                  style={{
                    textAlign: 'left',
                    marginTop: '8px',
                    marginLeft: '8px',
                    color: '#666',
                    fontSize: '8px',
                  }}
                >
                  Name
                </Text>
                <Text
                  style={{
                    // fontFamily: 'Roboto', 'Helvetica', 'Arial', sansSerif;
                    fontWeight: '400',
                    fontSize: '10px',
                    backgroundColor: 'rgb(214, 214, 214)',
                    // borderStyle: 'none',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    alignItems: 'flex-end',
                    marginBottom: '2px',
                  }}
                >
                  {user ? user.name : '...'}
                </Text>
              </View>
              <View
                style={{
                  width: '150px',
                  height: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgb(214, 214, 214)',
                  borderStyle: 'none', // eslint-disable-next-line
                  borderStyle: 'solid',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '1px',
                  borderColor: 'rgb(7, 5, 48)',
                  marginRight: '19px',
                  marginBottom: '30px',
                }}
              >
                <Text
                  style={{
                    textAlign: 'left',
                    marginTop: '8px',
                    marginLeft: '8px',
                    color: '#666',
                    fontSize: '8px',
                  }}
                >
                  Lastname
                </Text>
                <Text
                  style={{
                    // fontFamily: 'Roboto', 'Helvetica', 'Arial', sansSerif;
                    fontWeight: '400',
                    fontSize: '10px',
                    backgroundColor: 'rgb(214, 214, 214)',
                    // borderStyle: 'none',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    alignItems: 'flex-end',
                    marginBottom: '2px',
                  }}
                >
                  {user ? user.lastName : '...'}
                </Text>
              </View>
              <View
                style={{
                  width: '90px',
                  height: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgb(214, 214, 214)',
                  borderStyle: 'none', // eslint-disable-next-line
                  borderStyle: 'solid',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '1px',
                  borderColor: 'rgb(7, 5, 48)',
                  marginRight: '19px',
                  marginBottom: '30px',
                }}
              >
                <Text
                  style={{
                    textAlign: 'left',
                    marginTop: '8px',
                    marginLeft: '8px',
                    color: '#666',
                    fontSize: '8px',
                  }}
                >
                  Date
                </Text>
                <Text
                  style={{
                    // fontFamily: 'Roboto', 'Helvetica', 'Arial', sansSerif;
                    fontWeight: '400',
                    fontSize: '10px',
                    backgroundColor: 'rgb(214, 214, 214)',
                    // borderStyle: 'none',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    alignItems: 'flex-end',
                    marginBottom: '2px',
                  }}
                >
                  {user ? date : '...'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: '100%',
              /* height: 15vh; */
              /* border: solid black; */
              /* padding: 10px; */
              borderRadius: '5px',
              border: 'solid',
              borderColor: '#009be5',
              marginBottom: '12px',
              borderWidth: '1px',
              fontSize: '10px',
            }}
          >
            <View
              style={{
                marginTop: '15px',
                marginLeft: '15px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[0]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[1]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[2]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[3]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[4]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[5]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[6]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[7]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[8]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[9]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[10]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[11]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[12]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[13]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[14]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[15]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[16]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[17]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[18]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[19]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[20]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[21]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[22]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[23]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[24]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[25]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[26]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[27]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[28]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[29]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[30]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[31]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[32]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[33]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[34]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[35]}
              </Text>
              <Text
                style={{
                  width: '150px',
                  height: '30px',
                  marginBottom: '10px',
                  backgroundColor: 'rgb(214, 214, 214)',
                  marginLeft: '10px',
                  marginRight: '10px',
                  fontSize: '10px',
                  alignItems: 'center',
                  paddingLeft: '5px',
                  paddingTop: '10px',
                }}
              >
                {patientCHObj[36]}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PatientCHPdf;
