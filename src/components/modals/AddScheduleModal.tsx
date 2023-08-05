import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useAppDispatch } from "@/store/hooks";
import { CLOSE_SCHEDULE_MODAL } from "@/store/slice/isScheduleModalSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import { GrFormCalendar } from "react-icons/gr";
import moment from "moment";

const AddScheduleModal = (data: any) => {
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(CLOSE_SCHEDULE_MODAL(false));
  };

  const [value, onChange] = useState(new Date());
  const [showCalender, setShowCalender] = useState(false);

  // 캘린다 ON / OFF
  const handleCalenderButton = () => {
    setShowCalender(!showCalender);
  };
  const currentDate = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState<string>(currentDate);

  const handleDateChange = (date: any) => {
    const value = moment(date).format("YYYY-MM-DD");
    setSelectedDate(value);
  };

  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContext = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContext(e.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const axiosData = {
      C_IDX: data.data,
      S_HEAD: title,
      S_SUBH: context,
      S_DATE: selectedDate,
    };
    try {
      if (
        axiosData.C_IDX === null ||
        undefined ||
        axiosData.S_HEAD === null ||
        undefined ||
        axiosData.S_SUBH === null ||
        undefined ||
        axiosData.S_DATE === null ||
        undefined
      )
        throw Error("Schedule Data가 채워지지 않았습니다.");
      const result = axiosInstance.post("/club/i-schedule", axiosData);
      alert("일정이 생성되었습니다.");
      dispatch(CLOSE_SCHEDULE_MODAL(false));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="
        justify-content
        items-center
        flex
        fixed
        inset-0
        outline-none
        focus:outline-none
        bg-neutral-800/70
        "
      >
        <div
          className="
            relative
            w-[33rem]
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
            "
        >
          <div
            className="
                translate
                translate-y-45
                duration-300
                h-full
                opacity-100
                "
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-4
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
                "
            >
              <div
                className="
                    flex
                    flex-col
                    border-
                    m-4
                    relative
                    "
              >
                <div>
                  <div className="flex flex-col ">
                    <div className=" flex flex-row-reverse mb-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        name="modalScheduleButton"
                      >
                        <IoMdClose size={18} />
                      </button>
                    </div>
                    <form>
                      <div className="flex flex-start">
                        <div className="p-1 m-1 w-[6rem] text-center border-2 rounded-xl">
                          {" "}
                          Title{" "}
                        </div>
                        <input
                          className="p-1 border-2 m-1 w-[30rem] rounded-xl"
                          type="text"
                          placeholder="일정 제목을 입력해주세요"
                          onChange={handleTitle}
                          defaultValue={title}
                        />
                      </div>
                      <div className="flex flex-start">
                        <div className="p-1 m-1 border-2 w-[6rem] text-center rounded-xl">
                          {" "}
                          Context{" "}
                        </div>
                        <input
                          className="p-1 m-1 border-2 w-[30rem] rounded-xl"
                          type="text"
                          placeholder="세부 내용을 입력해주세요"
                          onChange={handleContext}
                          defaultValue={context}
                        />
                      </div>
                      <div className="flex flex-start">
                        <div className="p-1 m-1 border-2 w-[5rem] text-center rounded-xl">
                          날짜 선택
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={handleCalenderButton}
                            name="closeButton"
                          >
                            <GrFormCalendar size={40} />
                          </button>
                        </div>
                        <div className="">
                          <div className="mt-2 ml-2 text-[18px]">
                            {moment(selectedDate).format("YYYY-MM-DD")}
                          </div>
                        </div>
                      </div>
                      {showCalender && (
                        <div className="flex justify-center">
                          <Calendar
                            onChange={handleDateChange}
                            defaultValue={selectedDate}
                          />
                        </div>
                      )}
                      <div className="flex justify-center my-2">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="bg-blue-600 text-white p-2 rounded-xl border-2 w-[22rem] "
                          name="makeScheduleButton"
                        >
                          {" "}
                          생성하기{" "}
                        </button>
                      </div>
                    </form>
                    {/* 여기에 useState해서 넣을 에정 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddScheduleModal;
