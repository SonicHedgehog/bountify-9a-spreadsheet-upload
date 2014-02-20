class BatchesController < ApplicationController
  def new
    @batch = Batch.new
  end
end
