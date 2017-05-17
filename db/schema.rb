# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140127184037) do

  create_table "budgets", :force => true do |t|
    t.string   "name",       :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "budgets", ["name"], :name => "index_budgets_on_name"
  add_index "budgets", ["user_id", "name"], :name => "index_budgets_on_user_id_and_name", :unique => true
  add_index "budgets", ["user_id"], :name => "index_budgets_on_user_id"

  create_table "envelopes", :force => true do |t|
    t.string   "name",                         :null => false
    t.integer  "balance",         :limit => 8, :null => false
    t.integer  "parent_env_id"
    t.integer  "budget_id",                    :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
    t.integer  "expected_amount"
    t.string   "expected_time"
  end

  add_index "envelopes", ["budget_id", "parent_env_id", "name"], :name => "index_envelopes_on_budget_id_and_parent_env_id_and_name", :unique => true
  add_index "envelopes", ["name"], :name => "index_envelopes_on_name"
  add_index "envelopes", ["parent_env_id"], :name => "index_envelopes_on_parent_env_id"

  create_table "transactions", :force => true do |t|
    t.integer  "envelope_id",                   :null => false
    t.integer  "amount",           :limit => 8, :null => false
    t.integer  "old_balance",      :limit => 8, :null => false
    t.integer  "new_balance",      :limit => 8, :null => false
    t.string   "to"
    t.string   "memo"
    t.string   "transaction_type",              :null => false
    t.string   "payment_type"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.date     "transaction_date"
  end

  add_index "transactions", ["envelope_id"], :name => "index_transactions_on_envelope_id"

  create_table "users", :force => true do |t|
    t.string   "username",                            :null => false
    t.string   "password_digest",                     :null => false
    t.string   "session_token",                       :null => false
    t.boolean  "guest_flag",       :default => false, :null => false
    t.integer  "active_budget_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
  end

  add_index "users", ["active_budget_id"], :name => "index_users_on_active_budget_id", :unique => true
  add_index "users", ["guest_flag"], :name => "index_users_on_guest_flag"
  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end
