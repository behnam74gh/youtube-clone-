import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import axiosRequest from "../../api";
import moment from "moment";
import numeral from "numeral";
// import FakeVideoImage from "../../assets/images/leon.jpg";
// import FakeVideoCompany from "../../assets/images/1byy.jpg";
import "./_Video.scss";

const Video = ({ video }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await axiosRequest("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVideoDetails();
  }, [id]);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await axiosRequest("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });

      setChannelIcon(items[0].snippet.thumbnails.default);
    };

    getChannelIcon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  return (
    <div className="video">
      <div className="video__top">
        <img src={medium.url} alt="video img" />
        <span>{_duration}</span>
      </div>
      <div className="video__title">
        {title || "create app in 5 minutes #made by behnam ghazaghi from iran"}
      </div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} views
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__channel">
        <img src={channelIcon?.url} alt="company" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Video;
