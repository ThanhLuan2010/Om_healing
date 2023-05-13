import { baseQuery } from "@api/baseQuery";
import { Block, GradientButton, Header, Text } from "@components";
import { goBack } from "@navigation/RootNavigation";
import { setUserInfo, userSelect } from "@store/slices/user";
import { theme } from "@theme";
import { setLoading, showAlert } from "@utils/navigator";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Delyvering from "./Delivering";
import ListOrder from "./ListOrder";
import TopTab from "./TopTab";
import styles from "./styles";
import DelyverySuccess from "./DeliverySuccess";
import DelyveryFaild from "./Deliveryfail";
const CTVScreen = () => {
  const { userInfo } = useSelector(userSelect);
  const [indexTab, setindexTab] = useState(0);
  const dispatch = useDispatch();
  const getInfo = async () => {
    const response = await baseQuery({
      url: "user/info",
    });
    dispatch(setUserInfo(response.data));
  };
  const onRegisterCTV = async () => {
    setLoading(true);
    const response = await baseQuery({
      url: "ship/register",
      method: "POST",
    });
    setLoading(false);
    const { status, message } = response;
    if (status) {
      showAlert(
        "Thành công",
        message || "Đăng ký giao hàng thành công",
        "Xác nhận",
        "",
        () => {
          goBack();
          getInfo();
        }
      );
    } else {
      showAlert(
        "Thất bại",
        message || "Đăng ký giao hàng thất bại",
        "Xác nhận",
        "",
        () => {
          goBack();
        }
      );
    }
  };

  const renderBody = () => {
    switch (indexTab) {
      case 0:
        return <ListOrder />;
      case 1:
        return <Delyvering />;
      case 2:
        return <DelyverySuccess />;
      case 3:
        return <DelyveryFaild />;
      default:
        break;
    }
  };
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header style={styles.header} title={"Đăng ký CTV"} canGoBack />
      {userInfo?.user_is_shipper === 0 ? (
        <>
          <Text
            color="#747474"
            size={18}
            fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            marginHorizontal={20}
            marginVertical={30}
          >
            Để có thể bắt đầu giao hàng, bạn cần phải đăng ký làm Cộng Tác Viên
            của chúng tôi!
          </Text>
          <GradientButton
            onPress={onRegisterCTV}
            title="Đăng ký"
            styleTitle={styles.styleTitle}
            style={styles.button}
          />
        </>
      ) : (
        <Block flex>
          <TopTab onChangeTab={(id) => setindexTab(id)} indexTab={indexTab} />
          {renderBody()}
        </Block>
      )}
    </Block>
  );
};

export default CTVScreen;
