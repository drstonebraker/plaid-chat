# == Schema Information
#
# Table name: invites
#
#  id         :integer          not null, primary key
#  token      :string           not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Invite < ApplicationRecord
  validates :token, presence: true, uniqueness: true

  after_initialize :ensure_token!

  belongs_to :channel

  has_one :team,
    through: :channel,
    source: :team

  def self.generate_token
    new_token = SecureRandom.urlsafe_base64
    # redo if it has hyphen (makes harder to double-click to copy) or exists
    while new_token.include?('-') || Invite.exists?(token: new_token)
      new_token = SecureRandom.urlsafe_base64
    end
    new_token
  end

  def ensure_token!
    self.token ||= self.class.generate_token
  end

end
