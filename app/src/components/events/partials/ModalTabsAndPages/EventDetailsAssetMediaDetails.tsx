import React from "react";
import { connect } from "react-redux";
import EventDetailsTabHierarchyNavigation from "./EventDetailsTabHierarchyNavigation";
import Notifications from "../../../shared/Notifications";
import {
	getAssetMediaDetails,
	isFetchingAssets,
} from "../../../../selectors/eventDetailsSelectors";
import {
	formatDuration,
	humanReadableBytesFilter,
} from "../../../../utils/eventDetailsUtils";

/**
 * This component manages the media details sub-tab for assets tab of event details modal
 */
const EventDetailsAssetMediaDetails = ({
// @ts-expect-error TS(7031): Binding element 'eventId' implicitly has an 'any' ... Remove this comment to see the full error message
	eventId,
// @ts-expect-error TS(7031): Binding element 't' implicitly has an 'any' type.
	t,
// @ts-expect-error TS(7031): Binding element 'setHierarchy' implicitly has an '... Remove this comment to see the full error message
	setHierarchy,
// @ts-expect-error TS(7031): Binding element 'media' implicitly has an 'any' ty... Remove this comment to see the full error message
	media,
// @ts-expect-error TS(7031): Binding element 'isFetching' implicitly has an 'an... Remove this comment to see the full error message
	isFetching,
}) => {
// @ts-expect-error TS(7006): Parameter 'subTabName' implicitly has an 'any' typ... Remove this comment to see the full error message
	const openSubTab = (subTabName) => {
		setHierarchy(subTabName);
	};

	return (
		<div className="modal-content">
			{/* Hierarchy navigation */}
			<EventDetailsTabHierarchyNavigation
				openSubTab={openSubTab}
				hierarchyDepth={1}
				translationKey0={"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.TITLE"}
				subTabArgument0={"asset-media"}
				translationKey1={"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.TITLE"}
				subTabArgument1={"media-details"}
			/>

			<div className="modal-body">
				{/* Notifications */}
				<Notifications context="not_corner" />

				<div className="full-col">
					{/* table with general details for the media */}
					<div className="obj tbl-details">
						<header>
							{
								t(
									"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.TITLE"
								) /* Media Details */
							}
						</header>
						<div className="obj-container">
							<table className="main-tbl">
								{isFetching || (
									<tbody>
										<tr>
											<td>
												{
													t(
														"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.ID"
													) /* Id */
												}
											</td>
											<td>{media.id}</td>
										</tr>
										<tr>
											<td>
												{
													t(
														"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.TYPE"
													) /* Type */
												}
											</td>
											<td>{media.type}</td>
										</tr>
										<tr>
											<td>
												{
													t(
														"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.MIMETYPE"
													) /* Mimetype */
												}
											</td>
											<td>{media.mimetype}</td>
										</tr>
										<tr>
											<td>
												{
													t(
														"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.TAGS"
													) /* Tags */
												}
											</td>
											<td>
												{!!media.tags && media.tags.length > 0
													? media.tags.join(", ")
													: null}
											</td>
										</tr>
										<tr>
											<td>
												{
													t(
														"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.DURATION"
													) /* Duration */
												}
											</td>
											<td>
												{!!media.duration
													? formatDuration(media.duration)
													: null}
											</td>
										</tr>
										{!!media.size && media.size > 0 && (
											<tr>
												<td>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.SIZE"
														) /* Size */
													}
												</td>
												<td>{humanReadableBytesFilter(media.size)}</td>
											</tr>
										)}
										<tr>
											<td>
												{
													t(
														"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.URL"
													) /* Link */
												}
											</td>
											<td>
												<a href={media.url}>{media.url.split("?")[0]}</a>
											</td>
										</tr>
									</tbody>
								)}
							</table>
						</div>
					</div>

					{/* section with details for the media streams */}
					<div className="obj tbl-container media-stream-details">
						<header>
							{t("EVENTS.EVENTS.DETAILS.ASSETS.STREAMS") /* Streams */}
						</header>
						<div className="obj-container">
							<div className="table-series">
								{/* table with details for the audio streams */}
								<div className="wrapper">
									<header>
										{
											t(
												"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.STREAM_AUDIO"
											) /* Audio streams */
										}
									</header>
									<table className="main-tbl">
										<thead>
											<tr>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.ID"
														) /* ID */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.TYPE"
														) /* Type */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.CHANNELS"
														) /* Channels */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.BITRATE"
														) /* Bitrate */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.BITDEPTH"
														) /* Bitdepth */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.SAMPLINGRATE"
														) /* Samplingrate */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.FRAMECOUNT"
														) /* Framecount */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.PEAKLEVELDB"
														) /* Peak level DB */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.RMSLEVELDB"
														) /* RMS level DB */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.RMSPEAKDB"
														) /* RMS speak DB */
													}
												</th>
											</tr>
										</thead>
										<tbody>
											{!!media.streams.audio &&
// @ts-expect-error TS(7006): Parameter 'audioStream' implicitly has an 'any' ty... Remove this comment to see the full error message
												media.streams.audio.map((audioStream, key) => (
													<tr>
														<td>{key}</td>
														<td>{audioStream.type}</td>
														<td>{audioStream.channels}</td>
														<td>{audioStream.bitrate}</td>
														<td>{audioStream.bitdepth}</td>
														<td>{audioStream.samplingrate}</td>
														<td>{audioStream.framecount}</td>
														<td>{audioStream.peakleveldb}</td>
														<td>{audioStream.rmsleveldb}</td>
														<td>{audioStream.rmspeakdb}</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>

								{/* table with details for the video streams */}
								<div className="wrapper">
									<header>
										{
											t(
												"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.STREAM_VIDEO"
											) /* Video streams */
										}
									</header>
									<table className="main-tbl">
										<thead>
											<tr>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.ID"
														) /* ID */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.TYPE"
														) /* Type */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.FRAMERATE"
														) /* Framerate */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.BITRATE"
														) /* Bitrate */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.RESOLUTION"
														) /* Resolution */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.FRAMECOUNT"
														) /* Framecount */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.SCANTYPE"
														) /* Scantype */
													}
												</th>
												<th>
													{
														t(
															"EVENTS.EVENTS.DETAILS.ASSETS.MEDIA.DETAILS.SCANORDER"
														) /* Scanorder */
													}
												</th>
											</tr>
										</thead>
										<tbody>
											{!!media.streams.video &&
// @ts-expect-error TS(7006): Parameter 'videoStream' implicitly has an 'any' ty... Remove this comment to see the full error message
												media.streams.video.map((videoStream, key) => (
													<tr>
														<td>{key}</td>
														<td>
															{videoStream.type}
															<i />
														</td>
														<td>
															{videoStream.framerate}
															<i />
														</td>
														<td>
															{videoStream.bitrate}
															<i />
														</td>
														<td>
															{videoStream.resolution}
															<i />
														</td>
														<td>
															{videoStream.framecount}
															<i />
														</td>
														<td>
															{videoStream.scantype}
															<i />
														</td>
														<td>
															{videoStream.scanorder}
															<i />
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					{/* preview video player */}
					<div className="obj tbl-container media-stream-details">
						<header>
							{t("EVENTS.EVENTS.DETAILS.ASSETS.PREVIEW") /* Preview */}
						</header>
						<div className="obj-container">
							<div>
								{/* video player */}
								<div className="video-player">
									<div>
										<video id="player" controls>
											<source src={media.url} type="video/mp4" />
										</video>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Getting state data out of redux store
// @ts-expect-error TS(7006): Parameter 'state' implicitly has an 'any' type.
const mapStateToProps = (state) => ({
	isFetching: isFetchingAssets(state),
	media: getAssetMediaDetails(state),
});

export default connect(mapStateToProps)(EventDetailsAssetMediaDetails);
