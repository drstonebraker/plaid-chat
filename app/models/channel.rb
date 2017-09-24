# == Schema Information
#
# Table name: channels
#
#  id                :integer          not null, primary key
#  name              :string           not null
#  is_direct_message :boolean          default(FALSE), not null
#  team_id           :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, :is_direct_message, presence: true
  validates :name, uniqueness: { scope: :team_id,
    message: 'cannot have the same name as another channel on this team' }
  validate :valid_name

  belongs_to :team

  def valid_name
    unless valid_name?
      errors.add(:name, "must be lowercase, without spaces or periods," \
        " and shorter than 22 Characters.")
    end
  end

  def valid_name?
    return false if @name =~ /[A-Z\s\.]/
    return false if @name.length >= 22
    true
  end

end
