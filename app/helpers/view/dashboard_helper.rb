# frozen_string_literal: true

# ApplicationHelper contains all the view helpers.
module DashboardHelper

  # Render Nodes Table row
  def nodes_table_row(icon, name, ram, cpu, network, master)
    content_tag(:tr) do
      content_tag(:td) do
        case icon
        when 'ok'
          content_tag(:span, :class => 'text-success glyphicon glyphicon-ok-sign', :'aria-hidden' => true)
        when 'warning'
          content_tag(:span, :class => 'text-warning glyphicon glyphicon-exclamation-sign', :'aria-hidden' => true)
        when 'danger'
          content_tag(:span, :class => 'text-danger glyphicon glyphicon-remove-sign', :'aria-hidden' => true)
        end
      end
      content_tag(:td) do
        name
      end
      content_tag(:td) do
        ram
      end
      content_tag(:td) do
        cpu
      end
      content_tag(:td) do
        network
      end
      content_tag(:td) do
        content_tag(:div, :class => 'radio') do
          content_tag(:label) do
            if master
              content_tag(:input, :id => 'blankRadio1', :type => 'radio', :name => '', :value => '', :'aria-label' => '', :checked => true)
            else
              content_tag(:input, :id => 'blankRadio1', :type => 'radio', :name => '', :value => '', :'aria-label' => '')
            end
          end
        end
      end
    end
  end
end
