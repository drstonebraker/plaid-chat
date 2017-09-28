class Api::ChannelsController < ApplicationController
  before_action :require_login, only: %i(create)

  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      subscribe_current_user!(:channels, @channel)
      set_as_default!
      render :show
    else
      @errors = [@channel.errors.messages]
      render partial: 'api/shared/errors.json.jbuilder',
        status: 400
    end
  end

  def make_default
    @channel = Channel.find(params[:id])
    current_user.default_team_default_channel = @channel
    @team_membership = current_user.default_team_membership
    render 'api/team_memberships/show'
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :is_direct_message, :team_id)
  end

  def set_as_default!
    current_user.default_team_default_channel = @channel
  end

end
